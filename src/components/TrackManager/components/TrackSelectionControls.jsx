import { Box, Typography, IconButton, Chip } from "@mui/material";
import { ExpandLess, ExpandMore, SelectAll } from "@mui/icons-material";

function TrackSelectionControls({
  title,
  totalCount,
  selectedCount,
  expanded,
  onToggleExpanded,
  onSelectAll,
}) {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
      onClick={onToggleExpanded}
    >
      <Typography variant="h5">
        {title} ({totalCount})
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {selectedCount > 0 && (
          <Chip
            label={`${selectedCount} selected`}
            color="primary"
            size="small"
          />
        )}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onSelectAll();
          }}
          title="Select All"
        >
          <SelectAll />
        </IconButton>
        <IconButton>{expanded ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </Box>
    </Box>
  );
}

export default TrackSelectionControls;
